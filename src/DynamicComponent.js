import React, { useMemo, Suspense } from "react";
import ReactDom from "react-dom";
import "./App.css";
const packages = {
  react: React,
  "react-dom": ReactDom,
};

const getParsedModule = (code) => {
  let module = {
    exports: {},
  };
  const require = (name) => {
    return packages[name];
  };
  // eslint-disable-next-line no-new-func
  Function("require, exports, module", code)(require, module.exports, module);
  return module;
};

const fetchComponent = async (name) => {
  const text = await fetch(
    // `http://127.0.0.1:8080/${name}.js?ts=${Date.now()}`
    `https://plugin.reachable.cool/js/${name}.js?ts=${Date.now()}`
  ).then((a) => {
    if (!a.ok) {
      throw new Error("Network response was not ok");
    }
    return a.text();
  });
  const module = getParsedModule(text, name);
  return { default: module.exports };
};

const DynamicComponent = ({ name, children, ...props }) => {
  const Component = useMemo(() => {
    return React.lazy(async () => fetchComponent(name));
  }, [name]);

  return (
    <Suspense
      fallback={
        <div className="box">
          <div className="thing"></div>
          <div className="thing"></div>
          <div className="thing"></div>
          <div className="thing"></div>
        </div>
      }
    >
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};

export default React.memo(DynamicComponent);
