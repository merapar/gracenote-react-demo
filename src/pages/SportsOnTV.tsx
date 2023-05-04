import React from 'react';
import { Dayjs } from 'dayjs';
import { ContentDashboard } from '../components/ContentDashboard';
import { useOutletContext } from 'react-router-dom';
import { useGetSportsOnTV } from '../hooks/useGetSportsOnTv';

export const SportsOnTv = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { contentItems, isLoading } = useGetSportsOnTV({
    zip: zipCode,
    startDateTime: selectedDate,
  });

  return <ContentDashboard isLoading={isLoading} contentItems={contentItems} />;
};
