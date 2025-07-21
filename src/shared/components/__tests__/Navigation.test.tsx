import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navigation from '../Navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navigation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders navigation links', () => {
    render(<Navigation />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText('Problems')).toBeInTheDocument();
  });

  it('applies active styles to current page', () => {
    mockUsePathname.mockReturnValue('/about');
    render(<Navigation />);

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toHaveClass('text-blue-600');
  });

  it('applies hover styles to links', () => {
    render(<Navigation />);

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toHaveClass('hover:text-blue-600');
  });

  it('logs navigation when links are clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<Navigation />);

    const aboutLink = screen.getByText('About');
    aboutLink.click();

    expect(consoleSpy).toHaveBeenCalledWith(
      '🔗 Navigation: Navigating to About (/about)'
    );

    consoleSpy.mockRestore();
  });
});
