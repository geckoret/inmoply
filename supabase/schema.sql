-- Enable pgvector for AI semantic search
create extension if not exists vector;

-- Profiles Table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  user_type text check (user_type in ('individual', 'agency')) default 'individual',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Properties Table
create table properties (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  price numeric not null,
  bedrooms int,
  bathrooms int,
  area numeric,
  address text,
  city text,
  lat double precision,
  lng double precision,
  images text[] default '{}',
  is_verified boolean default false,
  seller_type text check (seller_type in ('private', 'agency')) not null,
  features text[] default '{}',
  embedding vector(1536), -- For AI semantic search
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies
alter table profiles enable row level security;
alter table properties enable row level security;

-- Profiles: Users can view all, but only edit their own
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Properties: Viewable by everyone, insert/update by owners
create policy "Properties are viewable by everyone" on properties for select using (true);
create policy "Owners can insert properties" on properties for insert with check (auth.uid() = seller_id);
create policy "Owners can update properties" on properties for update using (auth.uid() = seller_id);
create policy "Owners can delete properties" on properties for delete using (auth.uid() = seller_id);
