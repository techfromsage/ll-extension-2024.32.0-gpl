/**
 * Interface LayoutStateValues represents the available output states for the Layout StateMachine.
 */
import LayoutState from '@/enums/stateMachine/LayoutState';
import ScreenSize from '@/enums/ui/ScreenSize';
import Layout from '@/enums/stateMachine/Layout';

interface LayoutStateValues {
  [Layout.Layout]: LayoutState,
  [Layout.OpenedClosed]: LayoutState,
  [Layout.ScreenSize]: ScreenSize,
  [Layout.LibrarySearch]: LayoutState,
  [Layout.CitationModal]: LayoutState,
}

export default LayoutStateValues;
