import type { IGroup } from "@/types";
import { Service } from "./Service";

class GroupService extends Service<IGroup> {
  constructor() { super('/group') }
}

export const groupService = new GroupService();
