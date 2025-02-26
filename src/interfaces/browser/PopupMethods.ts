interface PopupMethods {
  /**
   * Methods that can be called by backend
   */
  background: {
    toggle: (tabId: number) => void,
  },
  /**
   * Methods that can be called by "content script".
   */
  contentScript: {
    listeners: {
      onToggle: (
        callback: () => Promise<void>
      ) => void,
    },
  },
}

export default PopupMethods;
