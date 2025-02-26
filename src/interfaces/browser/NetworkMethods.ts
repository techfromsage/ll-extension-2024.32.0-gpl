interface NetworkMethods {
  /**
   * Change the network
   */
  contentScript: {
    change: () => void,
  },
  background: {
    listeners: {
      /**
       * Action for when the network changes
       */
      onChanged: (callback: () => Promise<void>) => void,
    },
  },
}

export default NetworkMethods;
