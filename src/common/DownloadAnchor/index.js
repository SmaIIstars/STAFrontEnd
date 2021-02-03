import React, { memo } from "react";
import { filesDownload } from "../../servers/files";
const DowloadAnchor = (props) => {
  const { text, icon, className, fileName } = props;

  const download = (fileName) => {
    console.log(fileName);
    filesDownload(fileName).then((res) => {
      console.log(res);
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
