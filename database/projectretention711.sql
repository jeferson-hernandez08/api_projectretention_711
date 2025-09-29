-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2025 a las 22:46:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `projectretention711`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apprentices`
--

CREATE TABLE `apprentices` (
  `id` int(11) NOT NULL,
  `documentType` varchar(255) DEFAULT NULL,
  `document` varchar(255) DEFAULT NULL,
  `firtsName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `quarter` varchar(255) DEFAULT NULL,
  `fkIdGroups` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `apprentices`
--

INSERT INTO `apprentices` (`id`, `documentType`, `document`, `firtsName`, `lastName`, `phone`, `email`, `status`, `quarter`, `fkIdGroups`, `createdAt`, `updatedAt`) VALUES
(2, 'CC', '1002456789', 'Andrés Felipe', 'Ramírez López', '3124567890', 'andres.ramirez@misena.edu.co', 'Activo', '3', 1, '2025-09-12 23:16:55', '2025-09-12 23:16:55'),
(3, 'TI', '1102345678', 'María José', 'Cardona Pérez', '3109876543', 'maria.cardona@misena.edu.co', 'Activo', '2', 3, '2025-09-12 23:18:26', '2025-09-12 23:18:26'),
(4, 'CC', '1023456789', 'Julián Esteban', 'Hernández Quintero', '3012345678', 'julian.hernandez@misena.edu.co', 'Activo', '1', 4, '2025-09-12 23:18:54', '2025-09-12 23:18:54'),
(5, 'CE', '2009876543', 'Laura Camila', 'Gómez Ríos', '3156789012', 'laura.gomez@misena.edu.co', 'Activo', '4', 5, '2025-09-12 23:19:03', '2025-09-12 23:19:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `addressing` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `addressing`, `createdAt`, `updatedAt`) VALUES
(2, 'Motivos Económicos', 'El aprendiz posee problemas económicos para estudiar en el SENA.', 'Coordinador Académico', '2025-09-13 23:32:48', '2025-09-13 23:32:48'),
(3, 'Motivos Laborales', 'El trabajo del aprendiz no le da tiempo para estudiar.', 'Coordinador de Formación', '2025-09-13 23:33:38', '2025-09-13 23:33:38'),
(4, 'Motivos Familiares', 'A la familia del aprendiz no le agrada que estudie en el SENA.', 'Coordinador de Formación', '2025-09-13 23:34:21', '2025-09-13 23:34:21'),
(5, 'Motivos de Salud', 'El aprendiz posee una enfermedad que lo limita a estudiar.', 'Coordinador de Formación', '2025-09-13 23:37:27', '2025-09-13 23:37:27'),
(6, 'Motivos Sociales', 'El aprendiz presenta problemas sociales que afectan su permanencia.', 'Coordinador Académico', '2025-09-13 23:37:38', '2025-09-13 23:37:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `causes`
--

CREATE TABLE `causes` (
  `id` int(11) NOT NULL,
  `cause` varchar(255) DEFAULT NULL,
  `variable` varchar(255) DEFAULT NULL,
  `fkIdCategories` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `causes`
--

INSERT INTO `causes` (`id`, `cause`, `variable`, `fkIdCategories`, `createdAt`, `updatedAt`) VALUES
(2, 'No cuento con recursos económicos para estudiar en el SENA.', 'Necesidad del auto sostenimiento del aprendiz', 2, '2025-09-14 00:42:53', '2025-09-14 00:42:53'),
(3, 'Mi trabajo no me deja tiempo para estudiar.', 'Rol laboral', 3, '2025-09-14 00:43:30', '2025-09-14 00:43:30'),
(4, 'A mi familia no le agrada que yo estudiara en este programa, querían que estudiara algo diferente.', 'Apoyo y relación familiar', 4, '2025-09-14 00:43:41', '2025-09-14 00:43:41'),
(5, 'El aprendiz posee una enfermedad que lo limita a estudiar.', 'Física y emocional', 5, '2025-09-14 00:43:58', '2025-09-14 00:43:58'),
(6, 'Problemas en mi comunidad afectan mi asistencia al SENA.', 'Contexto territorial', 6, '2025-09-14 00:44:20', '2025-09-14 00:44:20'),
(7, 'Tuve que dedicarme a trabajar por no contar con apoyo económico para estudiar.', 'Necesidad del auto sostenimiento del aprendiz', 2, '2025-09-14 00:49:05', '2025-09-14 00:49:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `causes_reports`
--

CREATE TABLE `causes_reports` (
  `id` int(11) NOT NULL,
  `fkIdReports` int(11) DEFAULT NULL,
  `fkIdCauses` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `causes_reports`
--

INSERT INTO `causes_reports` (`id`, `fkIdReports`, `fkIdCauses`, `createdAt`, `updatedAt`) VALUES
(2, 2, 5, '2025-09-16 04:16:09', '2025-09-16 04:16:09'),
(3, 3, 2, '2025-09-16 04:16:37', '2025-09-16 04:16:37'),
(4, 3, 7, '2025-09-16 04:16:48', '2025-09-16 04:16:48'),
(5, 4, 4, '2025-09-16 04:16:57', '2025-09-16 04:16:57'),
(6, 4, 3, '2025-09-16 04:17:05', '2025-09-16 04:17:05'),
(7, 5, 6, '2025-09-16 04:17:17', '2025-09-16 04:17:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `trainingStart` date DEFAULT NULL,
  `trainingEnd` date DEFAULT NULL,
  `practiceStart` date DEFAULT NULL,
  `practiceEnd` date DEFAULT NULL,
  `managerName` varchar(255) DEFAULT NULL,
  `shift` varchar(255) DEFAULT NULL,
  `modality` varchar(255) DEFAULT NULL,
  `fkIdTrainingPrograms` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `groups`
--

INSERT INTO `groups` (`id`, `file`, `trainingStart`, `trainingEnd`, `practiceStart`, `practiceEnd`, `managerName`, `shift`, `modality`, `fkIdTrainingPrograms`, `createdAt`, `updatedAt`) VALUES
(1, '2873711', '2025-02-01', '2026-02-01', '2026-03-01', '2026-09-01', 'Julian Salazar', 'Mañana', 'Presencial', 1, '2025-09-11 16:41:40', '2025-09-11 16:41:40'),
(3, '2789450', '2025-04-01', '2026-04-01', '2026-05-01', '2026-11-01', 'María Fernanda López', 'Tarde', 'Mixta', 3, '2025-09-11 17:10:27', '2025-09-11 17:10:27'),
(4, '2901345', '2025-07-01', '2026-07-01', '2026-08-01', '2027-02-01', 'Andrés Ramírez', 'Noche', 'Presencial', 4, '2025-09-11 17:11:26', '2025-09-11 17:11:26'),
(5, '3056789', '2025-09-01', '2026-09-01', '2026-10-01', '2027-04-01', 'Laura Martínez', 'Mañana', 'Virtual', 5, '2025-09-11 17:14:58', '2025-09-11 17:14:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interventions`
--

CREATE TABLE `interventions` (
  `id` int(11) NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `fkIdStrategies` int(11) DEFAULT NULL,
  `fkIdReports` int(11) DEFAULT NULL,
  `fkIdUsers` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `interventions`
--

INSERT INTO `interventions` (`id`, `creationDate`, `description`, `fkIdStrategies`, `fkIdReports`, `fkIdUsers`, `createdAt`, `updatedAt`) VALUES
(2, '2025-09-15 09:30:00', 'Se habló con la aprendiz para aplicar al programa Jóvenes en Acción y se le brindó información sobre apoyos económicos disponibles.', 2, 3, 3, '2025-09-16 00:57:14', '2025-09-16 00:57:14'),
(3, '2025-09-15 10:15:00', 'Se gestionó con el empleador del aprendiz la posibilidad de ajustar el horario laboral para facilitar su permanencia en el SENA.', 4, 4, 2, '2025-09-16 00:59:43', '2025-09-16 00:59:43'),
(4, '2025-09-15 11:00:00', 'Se organizó un espacio de diálogo con la familia del aprendiz para fortalecer la motivación y el apoyo hacia su proceso formativo.', 6, 2, 4, '2025-09-16 01:02:01', '2025-09-16 01:02:01'),
(5, '2025-09-15 14:00:00', 'Se acompañó al aprendiz en la gestión para cambio de jornada debido a citas médicas frecuentes.', 7, 2, 3, '2025-09-16 01:02:49', '2025-09-16 01:02:49'),
(6, '2025-09-15 15:30:00', 'Se integró al aprendiz en un grupo focal de convivencia y resolución de conflictos para mejorar la interacción con sus compañeros.', 8, 4, 4, '2025-09-16 01:03:38', '2025-09-16 01:03:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `addressing` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `fkIdApprentices` int(11) DEFAULT NULL,
  `fkIdUsers` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reports`
--

INSERT INTO `reports` (`id`, `creationDate`, `description`, `addressing`, `state`, `fkIdApprentices`, `fkIdUsers`, `createdAt`, `updatedAt`) VALUES
(2, '2025-09-13 09:15:00', 'Aprendiz presenta problemas de salud y desea abandonar el programa.', 'Coordinador Académico', 'Registrado', 2, 3, '2025-09-13 22:03:22', '2025-09-13 22:03:22'),
(3, '2025-09-13 10:45:00', 'Aprendiz manifiesta dificultades económicas para continuar asistiendo.', 'Coordinador de Formación', 'En proceso', 3, 2, '2025-09-13 22:03:44', '2025-09-13 22:03:44'),
(4, '2025-09-13 11:30:00', 'Aprendiz con bajo rendimiento académico, se solicita acompañamiento.', 'Profesional de Bienestar', 'En proceso', 4, 4, '2025-09-13 22:03:54', '2025-09-13 22:03:54'),
(5, '2025-09-13 12:00:00', 'Aprendiz notificó oficialmente que abandona el programa por motivos personales.', 'Coordinador Académico', 'Desertado', 5, 6, '2025-09-13 22:06:54', '2025-09-13 22:06:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Instructor', '2025-09-13 01:55:15', '2025-09-13 01:55:15'),
(3, 'Coordinador', '2025-09-13 01:55:25', '2025-09-13 01:55:25'),
(4, 'Profesional Bienestar', '2025-09-13 01:55:44', '2025-09-13 01:55:44'),
(5, 'Aprendiz Vocero', '2025-09-13 01:55:54', '2025-09-13 01:58:21'),
(6, 'Administrador', '2025-09-13 01:56:08', '2025-09-13 01:56:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250909213045-create-training-programs.js'),
('20250909225959-create-groups.js'),
('20250912205328-create-apprentices.js'),
('20250913003829-create-rols.js'),
('20250913172037-create-users.js'),
('20250913202516-create-reports.js'),
('20250913221551-create-categories.js'),
('20250913234632-create-causes.js'),
('20250914142426-create-strategies.js'),
('20250914154737-create-interventions.js'),
('20250916012302-create-causes-reports.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `strategies`
--

CREATE TABLE `strategies` (
  `id` int(11) NOT NULL,
  `strategy` varchar(255) DEFAULT NULL,
  `fkIdCategories` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `strategies`
--

INSERT INTO `strategies` (`id`, `strategy`, `fkIdCategories`, `createdAt`, `updatedAt`) VALUES
(2, 'Orientar al aprendiz sobre las oportunidades a aplicar a apoyos socioeconómicos.', 2, '2025-09-14 15:22:38', '2025-09-14 15:22:38'),
(3, 'Articular acciones con el responsable de contrato para orientar a los aprendices sobre oportunidades de contrato de patrocinio.', 2, '2025-09-14 15:23:21', '2025-09-14 15:23:21'),
(4, 'Brindar orientación al aprendiz sobre la posibilidad de flexibilizar horarios académicos de acuerdo con sus responsabilidades laborales.', 3, '2025-09-14 15:23:41', '2025-09-14 15:23:41'),
(5, 'Gestionar convenios con empleadores para facilitar la permanencia de los aprendices en la formación.', 3, '2025-09-14 15:23:55', '2025-09-14 15:23:55'),
(6, 'Organización de grupos focales con aprendices para orientación de herramientas socioemocionales que les ayuden a superar las dificultades familiares.', 4, '2025-09-14 15:24:15', '2025-09-14 15:24:15'),
(7, 'Apoyo al aprendiz en la gestión para solicitar cambios de jornada o lugar de formación por motivos de salud.', 5, '2025-09-14 15:24:37', '2025-09-14 15:24:37'),
(8, 'Organización de grupos focales o campañas con aprendices para orientación de herramientas o habilidades sociales y sana convivencia entre pares.', 6, '2025-09-14 15:24:48', '2025-09-14 15:24:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `training_programs`
--

CREATE TABLE `training_programs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `training_programs`
--

INSERT INTO `training_programs` (`id`, `name`, `level`, `version`, `createdAt`, `updatedAt`) VALUES
(1, 'Análisis y Desarrollo de Software', 'Tecnólogo', '102', '2025-09-11 02:09:32', '2025-09-11 02:09:32'),
(3, 'Gestión de la Producción Industrial', 'Tecnólogo', '209', '2025-09-11 16:30:21', '2025-09-11 16:30:21'),
(4, 'Mantenimiento Mecánico Industrial', 'Técnico', '307', '2025-09-11 16:30:42', '2025-09-11 16:30:42'),
(5, 'Gestión de Procesos Logísticos', 'Tecnólogo', '115', '2025-09-11 16:31:11', '2025-09-11 16:31:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `document` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `coordinadorType` varchar(255) DEFAULT NULL,
  `manager` tinyint(1) DEFAULT NULL,
  `fkIdRols` int(11) DEFAULT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `passwordResetExpires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phone`, `document`, `password`, `coordinadorType`, `manager`, `fkIdRols`, `passwordResetToken`, `passwordResetExpires`, `createdAt`, `updatedAt`) VALUES
(2, 'Carlos', 'Martínez', 'carlos.martinez@misena.edu.co', '3105678901', '1001234567', '123', NULL, 0, 2, NULL, NULL, '2025-09-13 19:45:40', '2025-09-13 19:45:40'),
(3, 'Juliana', 'Gómez', 'juliana.gomez@misena.edu.co', '3159876543', '1009876543', 'Coordinador2025!', 'Académico', 1, 3, NULL, NULL, '2025-09-13 19:45:50', '2025-09-13 19:45:50'),
(4, 'Sofía', 'Ríos', 'sofia.rios@misena.edu.co', '3002345678', '1012345678', 'Bienestar#2025', 'Bienestar', 0, 4, NULL, NULL, '2025-09-13 19:52:27', '2025-09-13 19:52:27'),
(5, 'Andrés', 'Londoño', 'andres.londono@misena.edu.co', '3111234567', '1023456789', 'Vocero2025?', NULL, 0, 5, NULL, NULL, '2025-09-13 19:52:40', '2025-09-13 19:52:40'),
(6, 'Laura', 'Ramírez', 'laura.ramirez@misena.edu.co', '3209876543', '1034567890', 'AdminCpic#2025', NULL, 1, 6, NULL, NULL, '2025-09-13 19:52:50', '2025-09-13 19:52:50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apprentices`
--
ALTER TABLE `apprentices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdGroups` (`fkIdGroups`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `causes`
--
ALTER TABLE `causes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `causes_reports`
--
ALTER TABLE `causes_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdReports` (`fkIdReports`),
  ADD KEY `fkIdCauses` (`fkIdCauses`);

--
-- Indices de la tabla `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdTrainingPrograms` (`fkIdTrainingPrograms`);

--
-- Indices de la tabla `interventions`
--
ALTER TABLE `interventions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdStrategies` (`fkIdStrategies`),
  ADD KEY `fkIdReports` (`fkIdReports`),
  ADD KEY `fkIdUsers` (`fkIdUsers`);

--
-- Indices de la tabla `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdApprentices` (`fkIdApprentices`),
  ADD KEY `fkIdUsers` (`fkIdUsers`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `strategies`
--
ALTER TABLE `strategies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdCategories` (`fkIdCategories`);

--
-- Indices de la tabla `training_programs`
--
ALTER TABLE `training_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkIdRols` (`fkIdRols`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apprentices`
--
ALTER TABLE `apprentices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `causes`
--
ALTER TABLE `causes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `causes_reports`
--
ALTER TABLE `causes_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `interventions`
--
ALTER TABLE `interventions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `strategies`
--
ALTER TABLE `strategies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `training_programs`
--
ALTER TABLE `training_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `apprentices`
--
ALTER TABLE `apprentices`
  ADD CONSTRAINT `apprentices_ibfk_1` FOREIGN KEY (`fkIdGroups`) REFERENCES `groups` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `causes_reports`
--
ALTER TABLE `causes_reports`
  ADD CONSTRAINT `causes_reports_ibfk_1` FOREIGN KEY (`fkIdReports`) REFERENCES `reports` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `causes_reports_ibfk_2` FOREIGN KEY (`fkIdCauses`) REFERENCES `causes` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`fkIdTrainingPrograms`) REFERENCES `training_programs` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `interventions`
--
ALTER TABLE `interventions`
  ADD CONSTRAINT `interventions_ibfk_1` FOREIGN KEY (`fkIdStrategies`) REFERENCES `strategies` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `interventions_ibfk_2` FOREIGN KEY (`fkIdReports`) REFERENCES `reports` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `interventions_ibfk_3` FOREIGN KEY (`fkIdUsers`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`fkIdApprentices`) REFERENCES `apprentices` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`fkIdUsers`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `strategies`
--
ALTER TABLE `strategies`
  ADD CONSTRAINT `strategies_ibfk_1` FOREIGN KEY (`fkIdCategories`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`fkIdRols`) REFERENCES `rols` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
