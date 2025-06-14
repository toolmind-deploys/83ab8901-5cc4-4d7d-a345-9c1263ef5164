import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold'>Interview Experiences & Questions</h1>
                <div className='flex gap-2'>
                    <Badge variant='outline' className='text-sm'>
                        Total: {feeds.length}
                    </Badge>
                </div>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {feeds.map((feed: any) => (
                    <Card key={feed.id} className='hover:shadow-lg transition-shadow duration-300'>
                        <CardHeader className='flex flex-row justify-between items-start space-y-0 pb-2'>
                            <Badge
                                variant={feed.status === 'APPROVED' ? 'default' : 'secondary'}
                                className='mb-2'
                            >
                                {feed.status}
                            </Badge>
                            <span className='text-sm text-muted-foreground'>
                                {new Date(feed.createdAt).toLocaleDateString()}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <h2 className='text-xl font-semibold mb-2 line-clamp-2'>
                                {feed.title}
                            </h2>
                            
                            <div className='flex flex-wrap gap-2 mb-4'>
                                <Badge variant='outline' className='bg-blue-50'>
                                    {feed.company}
                                </Badge>
                                <Badge variant='outline' className='bg-green-50'>
                                    {feed.jobType}
                                </Badge>
                                {feed.employType && (
                                    <Badge variant='outline' className='bg-purple-50'>
                                        {feed.employType}
                                    </Badge>
                                )}
                            </div>
                            
                            <p className='text-muted-foreground line-clamp-3 mb-4 text-sm'>
                                {feed.description}
                            </p>
                            
                            <div className='flex items-center justify-between mt-4'>
                                <div className='flex items-center gap-2'>
                                    <Badge variant='secondary' className='text-xs'>
                                        {feed.feedType}
                                    </Badge>
                                    <Badge variant='secondary' className='text-xs'>
                                        {feed.community}
                                    </Badge>
                                </div>
                                {feed.pinned && (
                                    <span className='text-amber-500'>
                                        📌
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}