import React, { useState, useEffect } from 'react';
import { Dates } from './dates';
import './Main.css';


const getDaysUntil = (dateStr, type, enddateStr) => {
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

  const eventEndDate = new Date(enddateStr + 'T00:00:00Z');
  if (isNaN(eventEndDate)) return null;

  if (type === 'once') {
    const eventEndUTC = Date.UTC(
      eventEndDate.getUTCFullYear(),
      eventEndDate.getUTCMonth(),
      eventEndDate.getUTCDate()
    );
    const eventUTC = Date.UTC(
      eventDate.getUTCFullYear(),
      eventDate.getUTCMonth(),
      eventDate.getUTCDate()
    );
    const result = {days: Math.floor((eventUTC - todayUTC) / (1000 * 60 * 60 * 24)), 
      lag: Math.floor((eventEndUTC - eventUTC) / (1000 * 60 * 60 * 24))}
    if (eventEndUTC < todayUTC) return null;
    if (eventDate > todayUTC) {
      result.lag = 0;
    }
    return result;
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
    const result = {days: diff >= 0 ? diff : 0, lag: 0}
    return result;
  }

  return null; // неизвестный тип
};


const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);

  const recalcEvents = () => {
    const eventsWithDays = Object.entries(Dates)
      .map(([name, { date, type, sliderlength, enddate, color, image }]) => {
        const result = getDaysUntil(date, type, enddate);
        return result !== null ? { name, result, sliderlength, enddate, color, image} : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.result.days - b.result.days);

      setEvents(eventsWithDays);}

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
            const progressPercent = event.result.days / event.sliderlength * 100;
            const IsContinius = event.result.lag;

            return (
              <li key={index} style={{ margin: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  {/* Название и дни */}
                  <div style={{ width: '20vw', maxWidth: '40vw', display: 'flex', alignContent: 'flex-start', flexDirection: 'column'}}>
                    <strong>{event.name}</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#555' }}>
                      {IsContinius ? `Идёт в настоящий момент. До окончания ${event.result.days} дн.` : ''}
                    </span>
                    <span style={{ marginLeft: '0.5rem', color: '#555'}}>
                      {(event.days === 0 && !IsContinius)? '🎉 сегодня' : `${event.result.days} дн.`}
                    </span>
                  </div>
                  <div style={{
                    width: '60vw',
                    height: '15px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      borderRadius: '10px',
                      backgroundColor: `${event.color}`,
                      transition: 'width 0.3s ease',
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: '15px 15px',
                      backgroundRepeat: 'repeat'
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