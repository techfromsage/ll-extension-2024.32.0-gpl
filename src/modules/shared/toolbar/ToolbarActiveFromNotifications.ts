import NotificationUI from '@/interfaces/ui/NotificationUI';
import State from '@/enums/State';
import ToolbarActive from '@/interfaces/ui/ToolbarActive';

/**
 * Check if the Toolbar Icon should be active due to feature notifications.
 */
export default (notifications: NotificationUI[]): ToolbarActive => {
  const active = !notifications.every(notification =>
    ([State.NotSupported, State.OnCampusNotSupported].includes(notification.state)));

  return {
    active,
    value: '',
    isDotOnly: active,
  };
};
