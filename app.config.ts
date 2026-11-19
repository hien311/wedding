export default defineAppConfig({
  wedding: {
    groom: 'Gia Hiến',
    bride: 'Thanh Hiền',
    groomFull: 'Phùng Gia Hiến',
    brideFull: 'Trần Thanh Hiền',
    tagline: 'Trân trọng kính mời',
    /** Ngày hiện ở hero — ưu tiên ngày cơm thân mật */
    dateLabel: 'Chủ Nhật · 13.12.2026',
    timeLabel: '10:00',
    countdowns: [
      {
        id: 'day-13',
        title: 'Bữa cơm thân mật',
        at: '2026-12-13T10:00:00+07:00',
        dateLabel: 'Chủ Nhật · 13.12.2026',
        timeLabel: '10:00',
      },
      {
        id: 'day-14',
        title: 'Lễ thành hôn',
        at: '2026-12-14T10:30:00+07:00',
        dateLabel: 'Thứ Hai · 14.12.2026',
        timeLabel: '10:30',
      },
    ],
    events: [
      {
        title: 'Bữa cơm thân mật',
        time: '10:00',
        date: 'Chủ Nhật · 13.12.2026',
        day: '13',
        month: '12',
        note: 'Ngày tụ họp đầu tiên — rất mong được đón bạn.',
        featured: true,
      },
      {
        title: 'Lễ thành hôn',
        time: '10:30',
        date: 'Thứ Hai · 14.12.2026',
        day: '14',
        month: '12',
        note: 'Lễ chính thức tại tư gia nhà trai.',
        featured: true,
      },
    ],
    families: {
      groom: {
        label: 'Nhà trai',
        father: 'Ông Phùng Gia Thiều',
        mother: 'Bà Phùng Thị Việt Hậu',
      },
      bride: {
        label: 'Nhà gái',
        father: 'Ông Trần Hữu Dũng',
        mother: 'Bà Phạm Thị Thư',
      },
    },
    venue: 'Tư gia nhà trai',
    address: 'Thôn 11, xã Hạ Hòa, tỉnh Phú Thọ (Khu 1 Gia Điền cũ)',
    mapUrl: 'https://maps.app.goo.gl/HXQeqMWN5FqVArwZA',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=21.605435,105.060674&z=16&output=embed',
    heroImage: '/images/hero/MIN04572.webp',
    storyImage: '/images/gallery/MIN04820.webp',
    inviteText:
      'Chúng mình rất vui nếu được đón bạn trong ngày đặc biệt này — cùng chứng kiến và sẻ chia niềm hạnh phúc.',
  },
})
