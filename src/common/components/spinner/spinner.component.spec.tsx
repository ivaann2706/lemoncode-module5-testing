import * as React from 'react';

import { render, screen } from '@testing-library/react';
import * as PromiseTracker from 'react-promise-tracker';

import { SpinnerComponent } from './spinner.component';

jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: jest.fn(),
}));

describe('common/components/spinner/spinner specs', () => {
  it('Should call to usePromiseTracker when the component is rendered', () => {
    // Arrange
    const stub = jest
      .spyOn(PromiseTracker, 'usePromiseTracker')
      .mockReturnValue({
        promiseInProgress: false,
      });

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(stub).toHaveBeenCalled();
  });

  it('Should not be displayed the spinner when promiseInProgress equals false', () => {
    // Arrange
    jest.spyOn(PromiseTracker, 'usePromiseTracker').mockReturnValue({
      promiseInProgress: false,
    });

    // Act
    render(<SpinnerComponent />);
    const modalElement = screen.queryByRole('presentation');

    // Assert
    expect(modalElement).not.toBeInTheDocument();
  });

  it('Should be displayed the spinner when promiseInProgress equals true', () => {
    jest.spyOn(PromiseTracker, 'usePromiseTracker').mockReturnValue({
      promiseInProgress: true,
    });

    // Act
    render(<SpinnerComponent />);
    const modalElement = screen.queryByRole('presentation');

    // Assert
    expect(modalElement).toBeInTheDocument();
  });
});
