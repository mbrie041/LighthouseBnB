INSERT INTO users (id, name, email, password)
VALUES (1, 'Eva Stanley', 'sebastiongurrey@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
VALUES (2, 'Louis Mayer', 'jacksonrose@coldmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
VALUES (3, 'Dom Parks', 'domparks@lookout.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
VALUES (4, 'Etta Watts', 'charlielevy@ucloud.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code)
VALUES (1, 'What a', 'Description', 'https://images.pexels.com/photos/2088258/table-dining-room-chair-dining-area-2088258.jpeg', 'https://images.pexels.com/photos/2088258/table-dining-room-chair-dining-area-2088258.jpeg?auto=compress&cs=tinysrgb&h=350', 2438, 8, 2, 1, true, 'Prince Edward Island', 'Charlottetown', 'Canada', '1716 Misih Highway', '48752');
VALUES (2, 'Giant waste', 'Description', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 1457, 8, 2, 1, true, 'Prince Edward Island', 'Charlottetown', 'Canada', '2532345 Misih Highway', '235663');
VALUES (3, 'Of Time', 'Description', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&h=350', 1634, 5, 2, 2, false, 'Prince Edward Island', 'Charlottetown', 'Canada', '623523 Misih Highway', '234556');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 3, 1015319, 4, 'message');
VALUES (2, 2, 1013256, 5, 'message');
VALUES (3, 1, 1012397, 3, 'message');

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
VALUES (1, 795, 974, '2017-03-05', '2017-03-29');
VALUES (2, 10, 533, '2015-05-18', '2015-05-31');
VALUES (3, 915, 819, '2019-02-21', '2019-02-26');