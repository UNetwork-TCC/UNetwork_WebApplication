'use client';

import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ContactsArea } from '@/components';
import { type ReactElement, useEffect } from 'react';
import { useFindUserChatsMutation } from '@/features/chat';
import { useAppSelector } from '@/store';
import { type IChat } from '@/types';
import { ContactsAreaSkeleton } from '@/layout/skeletons';

export default function ChatPage(): ReactElement {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const userId = useAppSelector(state => state.auth.user._id);

    const [findUserChats, { data: chats, isLoading }] = useFindUserChatsMutation();

    useEffect(() => {
        (async () => {
            await findUserChats(userId ?? '');
        })();
    }, [findUserChats, userId]);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
            {isLoading ? (
                <ContactsAreaSkeleton />
            ) : (
                <>
                    <ContactsArea
                        userId={userId ?? ''}
                        chats={chats ?? ([] as IChat[])}
                        sx={matches ? {
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        } : {}}
                    />
                    {!matches && (
                        <>
                            <Divider orientation='vertical' role='presentation' flexItem sx={{ height: '100%' }} />
                            <Box
                                height='100%'
                                width='100%'
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    flexDirection='column'
                                    gap={{ xs: 3, sm: 4, md: 5 }}
                                    sx={{
                                        animation: 'anim 3s ease-in-out infinite alternate',
                                        '@keyframes anim': {
                                            '0%': {
                                                transform: 'translateY(-5%)'
                                            },
                                            '100%': {
                                                transform: 'translateY(0)'
                                            }
                                        },
                                        px: { xs: 2, sm: 0 }
                                    }}
                                >
                                    <img
                                        src='/assets/svg/Chat/chatbg.svg'
                                        style={{
                                            height: '70%',
                                            width: '70%',
                                            maxWidth: '400px',
                                            objectFit: 'contain'
                                        }}
                                        alt='Chat background'
                                    />
                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                                            textAlign: 'center'
                                        }}
                                    >
                                        Selecione uma conversa!
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}
