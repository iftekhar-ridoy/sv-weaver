
'use client';

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Package, Settings, User, Phone, MapPin, LogIn } from "lucide-react"
import { useAuth } from "@/context/auth";
import { LoginDialog } from "@/components/login-dialog";

function ProfileView({ user, onSignOut }: {user: any, onSignOut: () => void}) {
    const [activeView, setActiveView] = useState('profile');

    const orders = [
        { id: 'ORD001', date: '2023-10-26', status: 'Delivered', total: 144.98 },
        { id: 'ORD002', date: '2023-09-15', status: 'Delivered', total: 79.50 },
        { id: 'ORD003', date: '2023-08-01', status: 'Delivered', total: 120.00 },
    ];
    
    const addresses = {
        shipping: {
            name: "John Doe",
            address: "123 Market St",
            city: "San Francisco",
            state: "CA",
            zip: "94103",
            country: "USA"
        },
        billing: {
            name: "John Doe",
            address: "456 Mission St",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "USA"
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <aside className="md:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                   <nav className="flex flex-col">
                      <Button variant={activeView === 'profile' ? 'secondary' : 'ghost'} className="justify-start p-6 rounded-none text-base" onClick={() => setActiveView('profile')}>
                        <User className="mr-3" />
                        My Profile
                      </Button>
                      <Button variant={activeView === 'addresses' ? 'secondary' : 'ghost'} className="justify-start p-6 rounded-none text-base" onClick={() => setActiveView('addresses')}>
                        <MapPin className="mr-3" />
                        My Addresses
                      </Button>
                      <Button variant={activeView === 'orders' ? 'secondary' : 'ghost'} className="justify-start p-6 rounded-none text-base" onClick={() => setActiveView('orders')}>
                         <Package className="mr-3" />
                         Order History
                      </Button>
                       <Button variant={activeView === 'settings' ? 'secondary' : 'ghost'} className="justify-start p-6 rounded-none text-base" onClick={() => setActiveView('settings')}>
                        <Settings className="mr-3" />
                        Settings
                      </Button>
                   </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-3">
                {activeView === 'profile' && (
                     <Card id="profile">
                        <CardHeader>
                            <CardTitle>My Profile</CardTitle>
                            <CardDescription>Manage your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Full Name</p>
                                    <p className="text-muted-foreground">{user.name}</p>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit full name</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">Name</Label>
                                                <Input id="name" defaultValue={user.name} className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                             <Separator />
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Email Address</p>
                                    <p className="text-muted-foreground">{user.email}</p>
                                </div>
                                 <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit email address</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="email" className="text-right">Email</Label>
                                                <Input id="email" type="email" defaultValue={user.email} className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Separator />
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Phone Number</p>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit phone number</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="phone" className="text-right">Phone</Label>
                                                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                             <Separator />
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Password</p>
                                    <p className="text-muted-foreground">••••••••••••</p>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Change</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Change password</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="current-password" className="text-right">Current</Label>
                                                <Input id="current-password" type="password" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="new-password" className="text-right">New</Label>
                                                <Input id="new-password" type="password" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="confirm-password" className="text-right">Confirm</Label>
                                                <Input id="confirm-password" type="password" className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeView === 'addresses' && (
                     <Card id="addresses">
                        <CardHeader>
                            <CardTitle>My Addresses</CardTitle>
                            <CardDescription>Manage your shipping and billing addresses.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {Object.entries(addresses).map(([type, address]) => (
                                    <Card key={type}>
                                        <CardHeader>
                                            <CardTitle className="capitalize text-lg">{type} Address</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                                            <p className="font-medium text-foreground">{address.name}</p>
                                            <p>{address.address}</p>
                                            <p>{address.city}, {address.state} {address.zip}</p>
                                            <p>{address.country}</p>
                                        </CardContent>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="m-6 mt-0">Edit</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit {type} address</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your address here. Click save when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">Name</Label>
                                                        <Input id="name" defaultValue={address.name} className="col-span-3" />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="address" className="text-right">Address</Label>
                                                        <Input id="address" defaultValue={address.address} className="col-span-3" />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="city" className="text-right">City</Label>
                                                        <Input id="city" defaultValue={address.city} className="col-span-3" />
                                                    </div>
                                                     <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="state" className="text-right">State/Province</Label>
                                                        <Input id="state" defaultValue={address.state} className="col-span-3" />
                                                    </div>
                                                     <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="zip" className="text-right">Zip/Postal Code</Label>
                                                        <Input id="zip" defaultValue={address.zip} className="col-span-3" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeView === 'orders' && (
                    <Card id="orders">
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past orders and their status.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                             {orders.map(order => (
                               <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div>
                                        <p className="font-semibold text-primary">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                                    </div>
                                     <div>
                                        <p className="font-medium">${order.total.toFixed(2)}</p>
                                        <p className="text-sm text-right text-green-600 font-medium">{order.status}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <FileText className="h-5 w-5 text-muted-foreground"/>
                                    </Button>
                               </div>
                             ))}
                           </div>
                        </CardContent>
                    </Card>
                )}
                
                {activeView === 'settings' && (
                     <Card id="settings">
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Sign Out</p>
                                    <p className="text-muted-foreground text-sm">You can sign out of your account here.</p>
                                </div>
                                <Button variant="destructive" onClick={onSignOut}>Sign Out</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}

function LoginPrompt() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(true);
  
  return (
    <>
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
      <div className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-4">
          <LogIn className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold">Please Log In</h2>
        <p className="text-muted-foreground mt-2">You need to be logged in to view your profile.</p>
        <Button className="mt-6" onClick={() => setIsLoginDialogOpen(true)}>Log In</Button>
      </div>
    </>
  );
}

export default function ProfilePage() {
    const { user, logout } = useAuth();
    
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
            {user ? <ProfileView user={user} onSignOut={logout} /> : <LoginPrompt />}
        </div>
    )
}
