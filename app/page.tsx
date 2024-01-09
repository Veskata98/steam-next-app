import Navbar from '@/components/navbar/Navbar';
import ItemTable from '@/components/items/ItemTable';

import { AuthProvider } from '@/components/providers/AuthProvider';

export default function Home() {
    return (
        <main className="min-h-screen w-5/6 mx-auto relative">
            <AuthProvider>
                <Navbar />
                <ItemTable />
            </AuthProvider>
        </main>
    );
}
