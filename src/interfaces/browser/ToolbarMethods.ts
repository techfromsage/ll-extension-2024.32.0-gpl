interface ToolbarMethods {
  background: {
    setPopup: (details: { popup: string }) => Promise<void>,
    activeIcon: (tabId: number, isDotOnly: boolean) => void,
    badgeLabel: (tabId: number, text: string) => void,
    listeners: {
      /**
       * Action for when the toolbar icon is clicked.
       */
      onClicked: (
        callback: (tabId: number) => void
      ) => void,
    },
  },
}

export default ToolbarMethods;
