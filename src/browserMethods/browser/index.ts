/**
 * Extensions API browser methods to inject into app.
 *
 * A lot of this is just wrapping and running the browser methods.
 */
import BrowserMethods from '@/interfaces/browser/BrowserMethods';

import alarms from './alarms';
import app from './app';
import contextMenus from './contextMenus';
import navigation from './navigation';
import network from './network';
import permissions from './permissions';
import popup from './popup';
import runtime from './runtime';
import storage from './storage';
import tabs from './tabs';
import toolbar from './toolbar';
import windows from './windows';

const browser: BrowserMethods = {
  alarms,
  app,
  contextMenus,
  navigation,
  network,
  permissions,
  popup,
  runtime,
  storage,
  tabs,
  toolbar,
  windows,
};

export default browser;
