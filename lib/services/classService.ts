import type { IClass } from "@/types";
import { Service } from "./Service";

class ClassService extends Service<IClass> {
  constructor() { super('/class') }
}

export const classService = new ClassService();
