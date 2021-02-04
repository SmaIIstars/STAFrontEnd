import React, { memo } from "react";

import { filesDownload } from "../../servers/files";
import Moment from "moment";

const DowloadAnchor = (props) => {
  const { text, icon, className, fileName } = props;

  const download = (fileName) => {
    filesDownload(fileName).then((res) => {
      const { data } = res;
      console.log(data);

      let blobUrl = window.URL.createObjectURL(data);
      const filename = Moment() + ".xlsx";
      console.log(filename);
      const aElement = document.createElement("a");
      document.body.appendChild(aElement);
      aElement.style.display = "none";
      aElement.href = blobUrl;
      aElement.download = filename;
      aElement.click();
      document.body.removeChild(aElement);
    });
  };

  return (
    <div className={className} onClick={() => download(fileName)}>
      {icon}
      {text}
    </div>
  );
};

export default memo(DowloadAnchor);
