export class File {
  id;
  name;
  content;
  parentId;
  ownerId;
  users;
  size;
  marked;
  lastUpdateTime;

  constructor(
    id: string,
    name: string,
    content: object,
    parentId: string,
    ownerId: string,
    users: [],
    size: number,
    marked: boolean,
    lastUpdateTime: Date
  ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.parentId = parentId;
    this.ownerId = ownerId;
    this.users = users;
    this.size = size;
    this.marked = marked;
    this.lastUpdateTime = lastUpdateTime;
  }

  getFileSize() {
    let size = this.size;
    let factor = 0;
    while (size > 1000) {
      size = size % 1000;
      factor++;
    }

    let sizeString = size.toString();

    switch (factor) {
      case 0:
        sizeString += " B";
        break;
      case 1:
        sizeString += " KB";
        break;
      default:
        sizeString += " MB";
        break;
    }

    return sizeString;
  }
}
