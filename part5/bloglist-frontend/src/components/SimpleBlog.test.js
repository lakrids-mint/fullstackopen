import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from './SimpleBlog';

test('renders content', () => {
  const blog = {
    title: 'wedding cake',
    author: 'Luffy',
    likes: 1000
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} updateLike={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
  expect(blog.likes).toBe(1000)
  expect(blog.author).toBe('Luffy')
  expect(blog.title).toBe('wedding cake')
})
