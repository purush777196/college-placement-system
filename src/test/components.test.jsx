import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Card, { CardTitle, CardContent } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import DataTable from '../components/ui/DataTable';
import Breadcrumb from '../components/ui/Breadcrumb';
import ThemeSwitcher from '../components/common/ThemeSwitcher';

describe('Reusable UI Components Suite', () => {
  describe('Button', () => {
    it('renders text correctly', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Submit</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled or isLoading prop is set', () => {
      const { rerender } = render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();

      rerender(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Input', () => {
    it('renders input with placeholder and value', () => {
      render(<Input placeholder="Enter email" defaultValue="test@campus.edu" />);
      const input = screen.getByPlaceholderText(/enter email/i);
      expect(input).toHaveValue('test@campus.edu');
    });

    it('renders error message when error prop is passed', () => {
      render(<Input placeholder="Email" error="Invalid email address" />);
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  describe('Badge', () => {
    it('renders badge label and color variant', () => {
      render(<Badge variant="success">Active</Badge>);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('Card', () => {
    it('renders card with title and body', () => {
      render(
        <Card>
          <CardTitle>Drive Details</CardTitle>
          <CardContent>Google Cloud Campus Drive</CardContent>
        </Card>
      );
      expect(screen.getByText('Drive Details')).toBeInTheDocument();
      expect(screen.getByText('Google Cloud Campus Drive')).toBeInTheDocument();
    });
  });

  describe('Modal', () => {
    it('renders modal when isOpen is true', () => {
      render(
        <Modal isOpen={true} title="Test Modal" onClose={() => {}}>
          <p>Modal Body Content</p>
        </Modal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Body Content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} title="Hidden Modal" onClose={() => {}}>
          <p>Hidden Content</p>
        </Modal>
      );
      expect(screen.queryByText('Hidden Modal')).not.toBeInTheDocument();
    });
  });

  describe('DataTable', () => {
    it('renders columns and row records', () => {
      const cols = [
        { key: 'name', title: 'Name' },
        { key: 'score', title: 'Score' },
      ];
      const data = [{ id: '1', name: 'Aarav', score: 95 }];
      render(<DataTable columns={cols} data={data} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Aarav')).toBeInTheDocument();
      expect(screen.getByText('95')).toBeInTheDocument();
    });
  });

  describe('Breadcrumb', () => {
    it('renders navigation path items', () => {
      const items = [{ label: 'Portal', href: '/portal' }, { label: 'Settings' }];
      render(
        <MemoryRouter>
          <Breadcrumb items={items} />
        </MemoryRouter>
      );
      expect(screen.getByText('Portal')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  describe('ThemeSwitcher', () => {
    it('renders toggle button', () => {
      render(<ThemeSwitcher />);
      expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument();
    });
  });
});
