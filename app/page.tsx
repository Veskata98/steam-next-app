import Navbar from '@/components/navbar/Navbar';
import ItemsTable from '@/components/items/ItemsTable';

import { AuthProvider } from '@/components/providers/AuthProvider';

export default function Home() {
    return (
        <main className="min-h-screen w-5/6 mx-auto relative">
            <AuthProvider>
                <Navbar />
                <ItemsTable />
            </AuthProvider>
        </main>
    );
}
