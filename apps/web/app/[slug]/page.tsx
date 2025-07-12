
import { AppHeader } from '@/components/app-header'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'
type WorkspacePropType = {
    slug: string
}

export default async function Page({ params }: { params: Promise<WorkspacePropType> }) {
    const { slug } = await params
    return <div className="h-full flex flex-col">
        <div className='border-b flex-shrink-0'>
            <AppHeader>
                <Search className='h-4 w-4 text-muted-foreground' />
                <Input
                    type='text'
                    className='border-none rounded-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent px-1'
                    placeholder='Search by describing your assets...'>
                </Input>
            </AppHeader>
        </div>
        <div className='border-b'>
            <div className='ml-4 h-10 items-center flex'>
                <h1>Something {slug}</h1>
            </div>
        </div>
        <ScrollArea className='flex-1 min-h-0'> {/* min-h-0 is crucial */}
            onboarding
        </ScrollArea>
    </div>
}