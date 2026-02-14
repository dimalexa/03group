import React, { useState, useEffect } from 'react';
import { Dates } from './dates';
import './Main.css';


const getDaysUntil = (dateStr, type) => {
  const today = new Date();
  // нормализуем текущую дату к началу дня в UTC
  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );

  // парсим переданную дату как UTC полночь
  const eventDate = new Date(dateStr + 'T00:00:00Z');
  if (isNaN(eventDate)) return null; // неверный формат

  if (type === 'once') {
    const eventUTC = Date.UTC(
      eventDate.getUTCFullYear(),
      eventDate.getUTCMonth(),
      eventDate.getUTCDate()
    );
    if (eventUTC < todayUTC) return null; // уже прошло
    return Math.floor((eventUTC - todayUTC) / (1000 * 60 * 60 * 24));
  }

  if (type === 'recurring') {
    const month = eventDate.getUTCMonth();
    const day = eventDate.getUTCDate();
    const currentYear = today.getUTCFullYear();

    // пробуем дату в текущем году
    let nextEventUTC = Date.UTC(currentYear, month, day);

    // если она уже прошла (строго раньше today), берём следующий год
    if (nextEventUTC < todayUTC) {
      nextEventUTC = Date.UTC(currentYear + 1, month, day);
    }

    // защита от 29 февраля в невисокосном году: JS автоматически сделает 1 марта,
    // поэтому результат останется корректным (ближайшая реальная дата)
    const diff = Math.floor((nextEventUTC - todayUTC) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
  }

  return null; // неизвестный тип
};


const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [maxDays, setMaxDays] = useState(0);
  // вычисляем события с днями, отсеиваем прошедшие once
  const eventsWithDays = Object.entries(Dates)
    .map(([name, { date, type }]) => {
      const days = getDaysUntil(date, type);
      return days !== null ? { name, days } : null;
    })
    .filter(Boolean);

  // находим максимум дней среди топ-5 для шкалы прогресса

  const recalcEvents = () => {
    const eventsWithDays = Object.entries(Dates)
      .map(([name, { date, type, sliderlength }]) => {
        const days = getDaysUntil(date, type);
        return days !== null ? { name, days, sliderlength } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.days - b.days);

      setEvents(eventsWithDays);
    console.log('recalevents');
    if (eventsWithDays.length > 0) {
      setMaxDays(Math.max(...eventsWithDays.map(e => e.days)));
    } else {
      setMaxDays(0);
    }
    };

  useEffect(() => {
    recalcEvents();
  });

  useEffect(() => {
  const scheduleUpdate = () => {
    console.log('scheduleupdate');
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setDate(now.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      recalcEvents();
      // После полуночи переходим на ежедневный интервал
      const dailyIntervalId = setInterval(recalcEvents, 24 * 60 * 60 * 1000);
      // Сохраняем id для очистки (можно в ref)
        }, msUntilMidnight);

        return () => clearTimeout(timeoutId);
    };

    console.log('useffect');

    scheduleUpdate();
    });

  return (
    <div style={{ fontFamily: 'Open Sans', padding: '1rem' }}>
      <h2>📅 Ближайшие события 03 группы</h2>
      {events.length === 0 ? (
        <p>Нет предстоящих событий</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event, index) => {
            // доля заполнения (0% — максимум дней, 100% — 0 дней)
            const progressPercent = event.days

            return (
              <li key={index} style={{ margin: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  {/* Название и дни */}
                  <div style={{ minWidth: '150px', width: '20vw', display: 'flex', alignContent: 'flex-start', flexDirection: 'column'}}>
                    <strong>{event.name}</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#555' }}>
                      {event.days === 0 ? '🎉 сегодня' : `${event.days} дн.`}
                    </span>
                  </div>
                  <div style={{
                    width: '50vw',
                    height: '20px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      borderRadius: '10px',
                      backgroundColor: event.days < 7 ? '#6495ED' : '#87CEFA', // красный, если меньше недели
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                
                  
                  </div>

                  {/* Прогресс-бар */}
                  
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;