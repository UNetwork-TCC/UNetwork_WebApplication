import type { IMaterial } from "@/types";
import { Service } from "./Service";

class MaterialService extends Service<IMaterial> {
  constructor() { super('/material') }
}

export const materialService = new MaterialService();
