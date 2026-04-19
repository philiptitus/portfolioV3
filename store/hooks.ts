import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';

/**
 * Custom hook to use Redux dispatch with proper typing
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom hook to use Redux selector with proper typing
 */
export const useAppSelector = <TSelected,>(
  selector: (state: RootState) => TSelected
): TSelected => useSelector<RootState, TSelected>(selector);
