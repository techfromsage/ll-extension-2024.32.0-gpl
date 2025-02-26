# the store

> TL;DR - we're using [zustand](https://github.com/pmndrs/zustand).

Stores and State management aren't fun. They get confusing, complex, and over time are abused making it hard to find things quickly and onboard new members of a team.

The goal here is to ensure that doesn't happen.

### zustand
A small, fast and scalable bear-bones state-management solution using simplified flux principles. Has a comfy api based on hooks, isn't boilerplate-y or opinionated.

#### persist
The [persist middleware](https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data) enables you to store your Zustand state in a storage (e.g. localStorage, AsyncStorage, IndexedDB, etc...) thus persisting it's data.

This project uses [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/) / [Web Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage). To enable this there is a bit of extra middleware called ChromeStorage.ts which enables the Storage API to work with the persist middleware from zustand.

Persisted storage needs to have considerations around hydration, most noticeably that non-React code doesn't and won't hydrate on subscription/sync. Instead, you must use the `store.persist.onFinishHydration` hook and wrap store dependant code within that.

#### modules or slices
[Splitting the store into separate slices](https://github.com/pmndrs/zustand/wiki/Splitting-the-store-into-separate-slices) is a practice we've integrated to allow us to separate chunks of the store into simpler, digestible chunks.

#### sharing state between components
TODO: add further reading
- [code box](https://codesandbox.io/s/lingering-breeze-3dxcd)
- [github discussion](https://github.com/pmndrs/zustand/discussions/746)

#### typescript
see [https://github.com/pmndrs/zustand/issues/508](https://github.com/pmndrs/zustand/issues/508)

### Immer
Immer can be used in any context in which immutable data structures need to be used. For example in combination with React state, React or Redux reducers, or configuration management. Immutable data structures allow for (efficient) change detection: if the reference to an object didn't change, the object itself did not change. In addition, it makes cloning relatively cheap: Unchanged parts of a data tree don't need to be copied and are shared in memory with older versions of the same state.

[Read the docs](https://immerjs.github.io/immer/), they're great and have a lot of information for best practices and how to use it.