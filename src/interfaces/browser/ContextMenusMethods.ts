import CreateContextProperties from '@/interfaces/browser/CreateContextProperties';

/**
 * Methods that are app/domain specific.
 * e.g. updating institution
 */
interface ContextMenusMethods {
  background: {
    create: (properties: CreateContextProperties) => void,
    removeAll: () => void,
    listeners: {
      onClick: (
        callback: (compoundId: string, selectionText: string) => void
      ) => void,
    },
  },
}

export default ContextMenusMethods;
