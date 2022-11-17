import * as ReactDOM from "react-dom/client";

const domContainer = document.querySelector("#root");

let root = ReactDOM.createRoot(domContainer);

root.render(<div>test</div>);