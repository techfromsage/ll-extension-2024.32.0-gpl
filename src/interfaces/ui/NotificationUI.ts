/**
 * Interface NotificationUI provide a structure for passing notifications to the UI.
 */
import State from '@/enums/State';
import Feature from '@/enums/Feature';
import Institution from '@/interfaces/Institution';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import LibraryResourceFrequency from '@/enums/futures/LibraryResourceFrequency';
import { OpenAccessInfo } from '@/modules/shared/notifications/OpenAccessInfo';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';

interface NotificationUI {
  id: string | number,
  title: string,
  institution: Institution,
  state: State,
  feature: Feature,
  timeOut: number,
  logo: string,
  image?: string,
  message?: string,
  buttons?: NotificationUIButton[],
  cards?: NotificationUICard[],
  autoOpen?: boolean,
  libraryResourceType?: LibraryResourceType,
  frequency?: LibraryResourceFrequency,
  hasBeenClosed?: boolean,
  openAccess?: OpenAccessInfo,
  // Data that is used for non-rendering reasons e.g. statistics
  metadata?: NotificationMetadata,
}

export interface NotificationMetadata {
  referenceId?: string,
  linkType?: State | 'content',
  assistMessageId?: string,
  resourceDomain?: ResourceDomain,
  digitalResource?: DigitalResource,
}

export interface NotificationUIButton {
  url: string,
  text: string,
  level?: NotificationUIButtonLevel,
}

// for use with ebook finder and ebook finder multiple
export interface NotificationUICard {
  title: string,
  buttons: NotificationUIButton[],
}

export enum NotificationUIButtonLevel {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export default NotificationUI;
