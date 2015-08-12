CREATE TABLE IF NOT EXISTS `joa_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timealert` datetime NOT NULL,
  `type` varchar(11) NOT NULL COMMENT 'danger | warning | success | default',
  `alert` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;