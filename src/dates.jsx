import happy from './data/images/happy.png';
import newyear from './data/images/newyear.png';
import birthday from './data/images/happybirthday.png';
import study from './data/images/graduate.png';
import celebration from './data/images/celebration.png';


export const Dates = {
  'Новый год': { date: '2025-01-01', type: 'recurring', sliderlength: 365, enddate: '2025-01-01', color: '#e9e9f2', image: newyear},
  'День рождения Алины': { date: '2005-02-17', type: 'recurring', sliderlength: 365, enddate: '2005-02-17', color: '#e4e4ed', image: birthday},
  'День рождения Наташи': { date: '1980-03-07', type: 'recurring', sliderlength: 365, enddate: '1980-03-07', color: '#e4e4ed', image: birthday},
  'День рождения Леси': { date: '2005-04-15', type: 'recurring', sliderlength: 365, enddate: '2005-04-15', color: '#e4e4ed', image: birthday},
  'День рождения Даши': { date: '2004-07-09', type: 'recurring', sliderlength: 365, enddate: '2004-07-09', color: '#e4e4ed', image: birthday},
  'День рождения Маши': { date: '2004-08-09', type: 'recurring', sliderlength: 365, enddate: '2004-08-09', color: '#e4e4ed', image: birthday},
  'День рождения Кати': { date: '2004-09-30', type: 'recurring', sliderlength: 365, enddate: '2004-09-30', color: '#e4e4ed', image: birthday},
  'День рождения Полины': { date: '2004-12-26', type: 'recurring', sliderlength: 365, enddate: '2004-12-26', color: '#e4e4ed', image: birthday},
  'День рождения Мари': { date: '2004-01-08', type: 'recurring', sliderlength: 365, enddate: '2004-01-08', color: '#e4e4ed', image: birthday},
  'День рождения Тани': { date: '2004-01-12', type: 'recurring', sliderlength: 365, enddate: '2004-01-12', color: '#e4e4ed', image: birthday},
  '1 апреля 😀': { date: '2026-04-01', type: 'recurring', sliderlength: 365, enddate: '2026-04-01', color: 'white', image: happy},
  'Цикл по хирболезням': { date: '2026-02-16', type: 'once', sliderlength: 365, enddate: '2026-03-06', color: '#241f61', image: ''},
  'Цикл лекций по гигиене': { date: '2026-03-10', type: 'once', sliderlength: 365, enddate: '2026-03-14', color: '#241f61', image: ''},
  'Цикл по лучам': { date: '2026-03-16', type: 'once', sliderlength: 365, enddate: '2026-03-28', color: '#241f61', image: ''},
  'Цикл семинаров по гигиене': { date: '2026-03-30', type: 'once', sliderlength: 365, enddate: '2026-04-04', color: '#241f61', image: ''},
  'Цикл по неврологии': { date: '2026-04-06', type: 'once', sliderlength: 365, enddate: '2026-04-25', color: '#241f61', image: ''},
  'Цикл по терапии': { date: '2026-04-27', type: 'once', sliderlength: 365, enddate: '2026-05-23', color: '#241f61', image: ''},
  'Цикл по english': { date: '2026-05-25', type: 'once', sliderlength: 365, enddate: '2026-05-30', color: '#241f61', image: ''},
  'Цикл по биоэтике': { date: '2026-06-08', type: 'once', sliderlength: 365, enddate: '2026-06-11', color: '#241f61', image: ''},
  'Практика': { date: '2026-07-06', type: 'once', sliderlength: 365, enddate: '2026-08-02', color: '#241f61', image: ''},
  'big (very big) каникулы': { date: '2026-08-09', type: 'once', sliderlength: 365, enddate: '2026-09-31', color: 'white', image: celebration},
  'mini каникулы': { date: '2026-05-30', type: 'once', sliderlength: 365, enddate: '2026-06-07', color: 'white', image: celebration},
};