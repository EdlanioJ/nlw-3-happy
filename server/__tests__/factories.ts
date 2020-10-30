import bcrypt from 'bcryptjs';
import faker from 'faker';
import { Factory } from 'typeorm-factory';
import Image from '../src/models/Image';
import Orphanage from '../src/models/Orphanage';

import User from '../src/models/User';

export const user = new Factory(User)
  .sequence('email', () => faker.internet.email())
  .sequence('name', () => faker.name.findName())
  .sequence('password', () => bcrypt.hashSync(faker.internet.password(), 12));

export const orphanage = new Factory(Orphanage)
  .sequence('name', () => faker.name.findName())
  .sequence('latitude', () => Number(faker.address.latitude()))
  .sequence('longitude', () => Number(faker.address.longitude))
  .sequence('about', () => faker.lorem.paragraphs(2))
  .sequence('instructions', () => faker.lorem.lines(1))
  .sequence('opening_hours', () => faker.lorem.words(2))
  .sequence('open_on_weekends', () => faker.random.boolean())
  .sequence('status', () => (faker.random.boolean() ? 'draft' : 'public'));

export const image = new Factory(Image).sequence('path', () =>
  faker.image.imageUrl(400, 300, undefined, true, false)
);
