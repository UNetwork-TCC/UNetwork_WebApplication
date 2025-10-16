#!/bin/bash

# Fix Header.tsx
sed -i "1 i'use client';" layout/Header.tsx
sed -i "s/import { useNavigate } from 'react-router-dom'/import { useNavigate } from '@\/hooks'/g" layout/Header.tsx

# Fix SideBar.tsx  
sed -i "1 i'use client';" layout/SideBar.tsx
sed -i "s/import { useNavigate } from 'react-router-dom'/import { useNavigate } from '@\/hooks'/g" layout/SideBar.tsx

# Fix SearchBar.tsx
sed -i "1 i'use client';" layout/SearchBar.tsx
sed -i "s/import { useNavigate } from 'react-router-dom'/import { useNavigate } from '@\/hooks'/g" layout/SearchBar.tsx

echo "Imports fixados!"
