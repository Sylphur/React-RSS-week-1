import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import AppHeader from './AppHeader';

describe('Search-input component', () => {
  const storage: Record<string, string> = {};

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key: string) => storage[key]),
      setItem: vi.fn((key: string, value: string) => (storage[key] = value)),
    },
    writable: true,
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(<AppHeader></AppHeader>);

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'TestValue' } });

    const searchButton = screen.getByText('Search');
    act(() => {
      fireEvent.click(searchButton);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'searchParam',
      'TestValue'
    );
  });

  test('component retrieves the value from the local storage upon mounting', () => {
    render(<AppHeader />);

    expect(window.localStorage.getItem).toHaveBeenCalledWith('searchParam');

    expect(screen.getByDisplayValue('TestValue')).toBeInTheDocument();
  });
});

test('Verify that typing error renders the error boundary', async () => {
  render(<AppHeader></AppHeader>);

  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'error' } });

  await waitFor(() => {
    const errorMsg = screen.getByText('Something gone wrong');
    expect (errorMsg).toBeInTheDocument();
  })
  const errorBtn = screen.getByText<HTMLButtonElement>('Fix it!');
  fireEvent.click(errorBtn);
  await waitFor(() => {
    expect (errorBtn).toBeInTheDocument();
  })
});