import io from "socket.io-client";

const CHANNEL = "/gdx";

const encodeQueryParams = (params) => {
  const queryStrings = [];
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      queryStrings.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  });
  return queryStrings.join("&");
};

const isRemote = (serviceName) => {
  return serviceName.indexOf(":") > 0;
};

const int2String = (array) => {
  let result = "";
  array.forEach((x) => {
    x.forEach((y) => {
      result += String.fromCharCode(y);
    });
  });
  return result;
};

const readAllChunks = async (readableStream) => {
  const reader = readableStream.getReader();
  const chunks = [];

  const chunkReader = async () => {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return int2String(chunks);
      }
      chunks.push(value);
      return chunkReader();
    });
  };

  return chunkReader();
};

const toFunc = (strFunc) => {
  return eval("(" + strFunc + ")");
};

const findRemoteService = async (name) => {
  const idx = name.indexOf(":");
  const channel = name.substring(0, idx);
  const serviceName = name.substring(idx + 1);

  const res = await fetch(`/service/${serviceName}`);
  if (res.status !== 200) {
    throw res.statusText;
  }

  const jsonStr = await readAllChunks(res.body);
  const serviceInfo = JSON.parse(jsonStr);

  const service = {
    name: serviceName,
    proxy: RemoteProxy(serviceName, channel)
  };

  serviceInfo.methods.forEach((method) => {
    service[method.name] = async function (arg, handler) {
      return await service.proxy.invoke(method.name, arg, handler);
    };
  });

  return service;
};

const findLocalService = async ({ serviceName, connection, module, debug }) => {
  const queryStrings = encodeQueryParams({
    serviceName,
    connection,
    module
  });

  const res = await fetch(`/filipizen/service/metainfo?${queryStrings}`);
  if (res.status !== 200) {
    throw res.statusText;
  }

  const funcStr = await readAllChunks(res.body);
  const Func = toFunc(funcStr);
  return new Func(LocalProxy(serviceName, connection, module));
};

const RemoteProxy = (name, channel) => {
  const socket = io(CHANNEL);
  socket.connect();

  const invoke = async (method, args, handler) => {
    const promise = new Promise((resolve, reject) => {
      const params = {
        service: name,
        method: method,
        channel: channel,
        args: args
      };
      socket.emit("invoke", params, (res) => {
        console.log(
          `RemoteProxy [status] invoking ${params.service}.${params.method} channel: ${params.channel}`
        );
        if (res.status === "OK") {
          resolve(res.data);
        } else {
          reject(res.msg);
        }
      });
    });
    return await promise;
  };
  return { invoke };
};

const LocalProxy = (name, connection, module) => {
  const invoke = async (action, args, handler, ...rest) => {
    const data = {
      service: { connection, name, action },
      args
    };

    const urlaction = "/filipizen/service/invoke";
    const res = await fetch(urlaction, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.status !== 200) {
      throw res.statusText;
    }
    return await res.json();
  };
  return { invoke };
};

const serviceCache = {};

export const getService = (options = { debug: false }) => {
  const lookup = async (serviceName, connection = "default", module) => {
    if (serviceCache[serviceName] == null) {
      let svc;
      if (isRemote(serviceName)) {
        svc = await findRemoteService(serviceName);
      } else {
        svc = await findLocalService({
          serviceName,
          connection,
          module,
          ...options
        });
      }
      serviceCache[serviceName] = svc;
    }
    return serviceCache[serviceName];
  };

  return {
    lookup
  };
};

const getNotification = () => {
  const nsps = { "/gdx": [] };

  const register = (event, handler, nsp = "/gdx") => {
    const socket = io(nsp);
    socket.on(event, (data) => {
      handler(data);
    });

    const sockets = nsps[nsp];
    if (sockets === undefined) {
      nsps[nsp] = [socket];
    } else {
      nsps[nsp].push(socket);
    }
    return socket;
  };
  return { register };
};


module.exports = {
  getService,
  getNotification,
}