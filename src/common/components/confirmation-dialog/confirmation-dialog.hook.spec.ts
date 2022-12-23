import { act, renderHook } from '@testing-library/react';

import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('common/components/confirmation-dialog/confirmation-dialog hook specs', () => {
  it('should return by default isOpen equal to false, an empty lookup object, and three functions: onAccept, onClose, and onOpenDialog', () => {
    // Arrange
    const defaultItemToDelete: Lookup = { id: '', name: '' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(defaultItemToDelete);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('Should be the isOpen variable equal to true and the itemToDelete object equal to the one fed when the function onOpenDialog is called', () => {
    // Arrange
    const itemToDelete: Lookup = { id: '1', name: 'test' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });

    // Assert
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete).toEqual(itemToDelete);
  });

  it('Should be the isOpen variable equal to false when the close dialog function is called', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBeFalsy();
  });

  it('Should be the itemDelete object equal to empty when the accept function is called', () => {
    // Arrange
    const emptyItemToDelete: Lookup = { id: '', name: '' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(emptyItemToDelete);
  });
});
