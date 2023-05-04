import React from 'react';
import { Dayjs } from 'dayjs';
import { ContentDashboard } from '../components/ContentDashboard';
import { useOutletContext } from 'react-router-dom';
import { useGetSportsOnTv } from '../hooks/useGetSportsOnTv';

export const SportsOnTv = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { contentItems, isLoading } = useGetSportsOnTv({
    zip: zipCode,
    startDateTime: selectedDate,
  });

  return <ContentDashboard isLoading={isLoading} contentItems={contentItems} />;
};
