import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../app/App';

describe('App Root Suite', () => {
  it('renders CampusConnect application without crashing', () => {
    render(<App />);
    expect(screen.getAllByText(/CampusConnect/i).length).toBeGreaterThan(0);
  });
});
