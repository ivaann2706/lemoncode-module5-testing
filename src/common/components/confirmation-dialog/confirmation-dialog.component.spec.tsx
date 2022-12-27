import * as React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

interface LabelProps {
  closeButton: string;
  acceptButton: string;
}

interface Props {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
  title: string | React.ReactNode;
  labels: LabelProps;
  children: React.ReactNode;
}

describe('common/components/confirmation-dialog/confirmation-dialog specs', () => {
  const props = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'test title',
    labels: {
      acceptButton: 'Accept',
      closeButton: 'Cancel',
    },
    children: null,
  } as Props;

  it('Should not be displayed the dialog when isOpen equals false', () => {
    // Arrange
    const propsStub = { ...props, isOpen: false };

    // Act
    render(<ConfirmationDialogComponent {...propsStub} />);
    const dialogElement = screen.queryByRole('dialog');

    // Assert
    expect(dialogElement).not.toBeInTheDocument();
  });

  it('Should be displayed the dialog when isOpen equals true', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.queryByRole('dialog');

    // Assert
    expect(dialogElement).toBeInTheDocument();
  });

  it('Should display the same title as the one fed in the props', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const h2Element = screen.getByRole('heading', { level: 2 });

    // Assert
    expect(h2Element).toBeInTheDocument();
    expect(h2Element).not.toBeNull();
    expect(h2Element.tagName).toEqual('H2');
    expect(h2Element.textContent).toEqual(props.title);
  });

  it('Should display the same accept button label as the one fed in the props', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonElement = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.tagName).toEqual('BUTTON');
  });

  it('Should display the same close button label as the one fed in the props', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonElement = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.tagName).toEqual('BUTTON');
  });

  it('Should call onAccept when it clicks on accept button', async () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonElement = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });
    await userEvent.click(buttonElement);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
  });

  it('Should call onClose when it clicks on close button', async () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonElement = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    await userEvent.click(buttonElement);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });
});
