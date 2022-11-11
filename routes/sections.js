import { Router } from 'express'
import { createSection, deleteSection, fetchAllSection, test, updateSection } from '../controllers/Section.controller.js'
const SectionRoutes = Router()

SectionRoutes.get('/test', test)

SectionRoutes.get('/all', fetchAllSection)
SectionRoutes.post('/create', createSection)
SectionRoutes.get('/:sectionid/delete', deleteSection)
SectionRoutes.post('/update', updateSection)

export default SectionRoutes