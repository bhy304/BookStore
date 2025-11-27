import { useEffect, useState, useMemo } from 'react';
import type { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';
import { useLocation } from 'react-router-dom';

export const useCategory = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);

  // 초기 데이터 로드 (한 번만)
  useEffect(() => {
    fetchCategory().then((data) => {
      if (data) {
        setCategories(data);
      }
    });
  }, []);

  // URL에 따라 isActive 상태를 계산 (파생 상태)
  const category = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const activeCategoryId = params.get('category_id')
      ? Number(params.get('category_id'))
      : null;
    const isNewsActive = params.get('news') === 'true';

    const categoryWithAll = [
      {
        category_id: null,
        category_name: '전체',
        isActive: activeCategoryId === null && !isNewsActive,
      },
      ...categories.map((item) => ({
        ...item,
        isActive: item.category_id === activeCategoryId && !isNewsActive,
      })),
    ];

    return categoryWithAll;
  }, [categories, location.search]);

  return category;
};
