import * as fs from 'fs';
import * as path from 'path';

// 创建文件夹
export const mkdir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    if (mkdir(path.dirname(dir))) {
      fs.mkdirSync(dir);
      return true;
    }
  }
  return true;
};

// 删除文件夹
export const delDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    return true;
  }
  fs.unlink(dir, err => {
    if (err) {
      console.log('删除文件====>', err);
    }
  });
};

// 移动文件
export const pipe = (dir: string, filename: string) => {
  const read = fs.createReadStream(dir);
  const write = fs.createWriteStream(path.join(dir, filename));
  read.pipe(write);
};
