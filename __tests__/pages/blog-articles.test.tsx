import { fireEvent, render, screen, within } from '@testing-library/react';
import { BlogArticle } from '@/components/blog/blog-article';
import { blogPosts } from '@/lib/blog-posts';

jest.mock('next/image', () => ({ __esModule: true, default: ({ priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => <img {...props} /> }));

describe('blog article guides', () => {
  it.each(blogPosts)('$slug renders the article structure and tool', (post) => {
    render(<BlogArticle post={post} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('img', { name: post.imageAlt })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getAllByRole('definition')).toHaveLength(3);
    expect(screen.getByRole('link', { name: /share your layout or plot plan on whatsapp/i })).toHaveAttribute('href', 'https://wa.me/919828088678');
    const toolHeadings = ['Compare by topic', 'Plot readiness checklist', 'Entrance direction explorer', 'Plan readiness check'];
    expect(screen.getByRole('heading', { name: toolHeadings[['compare', 'plot-checklist', 'entrance-explorer', 'plan-check'].indexOf(post.tool)] })).toBeInTheDocument();
  });

  it('compares the selected topic', () => {
    render(<BlogArticle post={blogPosts[0]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kitchen' }));
    expect(screen.getByText(/kitchen location and the relationship between cooking and water areas/i)).toBeInTheDocument();
    expect(screen.getByText(/which services and appliance positions cannot be changed safely/i)).toBeInTheDocument();
  });

  it('updates plot readiness progress and includes selected items in its WhatsApp link', () => {
    render(<BlogArticle post={blogPosts[1]} />);
    const checkbox = screen.getByRole('checkbox', { name: /title and ownership records/i });
    fireEvent.click(checkbox);
    expect(screen.getByText('1 of 10 items checked')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /share checked items on whatsapp/i })).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('Title and ownership records reviewed by a lawyer')));
  });

  it('shows the selected entrance direction and practical checks', () => {
    render(<BlogArticle post={blogPosts[2]} />);
    fireEvent.click(screen.getByRole('button', { name: 'SE' }));
    const tool = screen.getByRole('heading', { name: /entrance direction explorer/i }).closest('section');
    expect(tool).toHaveTextContent(/SE: a traditional reading may discuss this area alongside the room layout/i);
    expect(screen.getByText(/ventilation, clear access, lighting and safe entry/i)).toBeInTheDocument();
  });

  it('lists plan details that still need preparation', () => {
    render(<BlogArticle post={blogPosts[3]} />);
    const dimensionCheck = screen.getAllByText(/outside and room dimensions are shown/i)[0];
    const fieldset = dimensionCheck.closest('fieldset');
    expect(fieldset).not.toBeNull();
    fireEvent.click(within(fieldset as HTMLElement).getByRole('button', { name: 'Yes' }));
    const summary = screen.getByRole('heading', { name: /items to prepare or confirm/i }).parentElement as HTMLElement;
    expect(within(summary).queryByText('Outside and room dimensions are shown')).not.toBeInTheDocument();
  });
});
