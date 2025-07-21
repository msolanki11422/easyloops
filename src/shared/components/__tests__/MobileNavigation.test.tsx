import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import MobileNavigation from '../MobileNavigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('MobileNavigation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders hamburger button', () => {
    render(<MobileNavigation />);

    const button = screen.getByLabelText('Toggle navigation menu');
    expect(button).toBeInTheDocument();
  });

  it('toggles menu when hamburger button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<MobileNavigation />);

    const button = screen.getByLabelText('Toggle navigation menu');

    // Initially menu should be closed
    expect(screen.queryByText('About')).not.toBeInTheDocument();

    // Click to open menu
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith(
      '📱 Mobile Navigation: Opening mobile menu'
    );
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText('Problems')).toBeInTheDocument();

    // Click to close menu
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith(
      '📱 Mobile Navigation: Closing mobile menu'
    );
    expect(screen.queryByText('About')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('closes menu when navigation link is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<MobileNavigation />);

    const button = screen.getByLabelText('Toggle navigation menu');

    // Open menu
    fireEvent.click(button);
    expect(screen.getByText('About')).toBeInTheDocument();

    // Click navigation link
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    expect(consoleSpy).toHaveBeenCalledWith(
      '🔗 Mobile Navigation: Navigating to About (/about)'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      '📱 Mobile Navigation: Closing mobile menu'
    );
    expect(screen.queryByText('About')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('applies active styles to current page', () => {
    mockUsePathname.mockReturnValue('/about');
    render(<MobileNavigation />);

    const button = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(button);

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toHaveClass('text-blue-600');
  });
});
