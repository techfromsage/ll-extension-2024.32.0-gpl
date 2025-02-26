import SciwheelStatus from '@/enums/sciwheel/SciwheelStatus';
import SciwheelType from '@/enums/sciwheel/SciwheelType';
import SciwheelPermissions from '@/enums/sciwheel/SciwheelPermissions';
import { SciwheelTag } from '@/interfaces/sciwheel/SciwheelTag';

export interface SciwheelProject {
  id: string,
  name: string,
  children?: string[],
  permissions?: SciwheelPermissions,
  interactionsSinceLastVisit?: number | null,
  fullPath?: string | null,
  type?: SciwheelType,
  isSubcollection?: false,
  status?: SciwheelStatus,
  tags?: SciwheelTag[],
}
