import { Badge } from '@/components/ui/badge';

async function getFeeds() {
    const response = await fetch('http://localhost:3000/api/feeds', {
        cache: 'no-store'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch feeds');
    }
    return response.json();
}

export default async function FeedsPage() {
    const feeds = await getFeeds();

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>Interview Experiences & Questions</h1>
            
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {feeds.map((feed: any) => (
                    <div
                        key={feed.id}
                        className='bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'
                    >
                        <div className='p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <Badge variant={feed.status === 'APPROVED' ? 'success' : 'secondary'}>
                                    {feed.status}
                                </Badge>
                                <span className='text-sm text-gray-500'>
                                    {new Date(feed.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <h2 className='text-xl font-semibold mb-2 line-clamp-2'>
                                {feed.title}
                            </h2>
                            
                            <div className='flex gap-2 mb-4'>
                                <Badge variant='outline'>{feed.company}</Badge>
                                <Badge variant='outline'>{feed.jobType}</Badge>
                                {feed.employType && (
                                    <Badge variant='outline'>{feed.employType}</Badge>
                                )}
                            </div>
                            
                            <p className='text-gray-600 dark:text-gray-300 line-clamp-3 mb-4'>
                                {feed.description}
                            </p>
                            
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-2'>
                                    <span className='text-sm text-gray-500'>
                                        {feed.community}
                                    </span>
                                </div>
                                {feed.pinned && (
                                    <Badge variant='secondary'>
                                        📌 Pinned
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}