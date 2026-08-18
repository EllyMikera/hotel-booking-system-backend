-- =====================
-- Rooms Table
-- =====================
INSERT INTO rooms (room_number, room_type, price, description)
VALUES
    (
        1, 
        'standard', 
        4500,
        'A comfortable and thoughtfully furnished room 
        offering everything needed for a relaxing stay.
        Ideal for solo travellers and couples looking
        for a cozy and affordable accomodation
        '
    ),
    (
        2, 
        'deluxe', 
        6000,
        'A spacious and elegantly furnished room offering
        enhanced comfort and additional space.
        Perfect for guests seeking a more refined and 
        relaxing accomodation experience'
    ),
    (
        3, 
        'suite', 
        7500,
        'An expensive and luxurious accomodation featuring
        separate sleeping and living areas.
        Designed for guests who value space, privacy and an
        elevated hotel experience'
    ),
    (
        4, 
        'family', 
        9000,
        'A spacious and family-friendly accomofation designed
        to provide comfortable sleeping arrangements with plenty
        of room for families to relax and spend quality time together'
    ),
    (
        5, 
        'superior', 
        10500,
        'A beautifully appointed room combining contemporary style,
        generous space and premium comforts.
        An excellent choice for guests looking for an upgraded stay
        without the size of a suite'
    ),
    (
        6, 
        'studio', 
        12000,
        'A versatile open-plan accomodation combinig sleeping, living
        and working space in one comfortable environment. Ideal
        for guests who prefer a spacious and practical room for
        extended or flexible stays'
    );

-- To copy this data into your database use; mysql -u root -p database_name < data.sql